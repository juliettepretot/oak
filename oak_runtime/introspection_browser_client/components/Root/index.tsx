//
// Copyright 2020 The Project Oak Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import ApplicationStateOverview from '~/components/ApplicationStateOverview';
import EventList from '~/components/EventList';
import introspectionEventsProto from '~/proto/introspection_events_pb';

// Requests the list of introspection events provided by the Oak runtime's
// auxiliary introspection server.
function loadSerializedEvents(): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const eventsRequest = new XMLHttpRequest();
    eventsRequest.open(
      'GET',
      'http://localhost:1909/introspection-events',
      true
    );
    eventsRequest.responseType = 'arraybuffer';

    eventsRequest.addEventListener('load', () =>
      resolve(eventsRequest.response)
    );
    eventsRequest.addEventListener('error', reject);
    eventsRequest.addEventListener('abort', reject);

    eventsRequest.send(null);
  });
}

export interface OakApplicationState {
  nodeInfos: NodeInfos;
  channels: Channels;
}

type NodeId = number;
type AbiHandle = number;
type NodeInfos = Map<NodeId, NodeInfo>;
interface NodeInfo {
  abiHandles: Map<AbiHandle, ChannelHalf>;
}

type ChannelID = number;
enum ChannelHalfDirection {
  Read,
  Write,
}
interface ChannelHalf {
  channelId: ChannelID;
  direction: ChannelHalfDirection;
}
interface Message {
  data: Uint8Array;
  channels: ChannelHalf[];
}
interface Channel {
  id: ChannelID;
  messages: Message[];
}
type Channels = Map<ChannelID, Channel>;

function eventReducer(
  applicationState: OakApplicationState,
  event: introspectionEventsProto.Event
) {
  const eventType = event.getEventDetailsCase();
  const { EventDetailsCase } = introspectionEventsProto.Event;

  switch (eventType) {
    case EventDetailsCase.NODE_CREATED:
      applicationState.nodeInfos.set(event.getNodeCreated().getNodeId(), {
        abiHandles: new Map(),
      });

      break;
    case EventDetailsCase.NODE_DESTROYED:
      applicationState.nodeInfos.delete(event.getNodeDestroyed().getNodeId());

      break;
    case EventDetailsCase.CHANNEL_CREATED:
      {
        const channelId = event.getChannelCreated().getChannelId();
        applicationState.channels.set(channelId, {
          id: channelId,
          messages: [],
        });
      }

      break;
    case EventDetailsCase.CHANNEL_DESTROYED:
      applicationState.channels.delete(
        event.getChannelDestroyed().getChannelId()
      );

      break;
    case EventDetailsCase.HANDLE_CREATED:
      {
        const details = event.getHandleCreated();
        applicationState.nodeInfos
          .get(details.getNodeId())
          .abiHandles.set(details.getHandle(), {
            channelId: details.getChannelId(),
            direction: 0,
          });
      }
      break;
    case EventDetailsCase.HANDLE_DESTROYED:
      {
        const details = event.getHandleDestroyed();
        applicationState.nodeInfos
          .get(details.getNodeId())
          .abiHandles.delete(details.getHandle());
      }
      break;
    case EventDetailsCase.MESSAGE_ENQUEUED:
      // TODO(#913): Add support for displaying messages
      break;
    case EventDetailsCase.MESSAGE_DEQUEUED:
      // TODO(#913): Add support for displaying messages
      break;
    default:
      // This should never happen
      throw new Error(`Encountered unhandled event of type ${eventType}`);
  }

  return applicationState;
}

function useEvents() {
  const [events, setEvents] = React.useState<introspectionEventsProto.Event[]>(
    []
  );
  React.useEffect(() => {
    async function loadEvents() {
      const serializedEvents: Uint8Array = await loadSerializedEvents();
      const events = introspectionEventsProto.Events.deserializeBinary(
        serializedEvents
      ).getEventsList();
      setEvents(events);
    }

    loadEvents();
  }, []);

  return events;
}

export default function Root() {
  const events = useEvents();
  const applicationState = React.useMemo(
    (): OakApplicationState =>
      events.reduce(eventReducer, {
        nodeInfos: new Map(),
        channels: new Map(),
      }),
    [events]
  );

  return (
    <>
      <ApplicationStateOverview applicationState={applicationState} />
      <EventList events={events} />
    </>
  );
}
