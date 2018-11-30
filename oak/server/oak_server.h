/*
 * Copyright 2018 Project Oak authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "oak/proto/oak_server.grpc.pb.h"

namespace oak {
namespace grpc_server {

class OakServer final : public oak::OakServer::Service {
 public:
  OakServer();

 private:
  ::grpc::Status InitiateComputation(::grpc::ServerContext *context,
                                     const ::oak::InitiateComputationRequest *request,
                                     ::oak::InitiateComputationResponse *response) override;
};

}  // namespace grpc_server
}  // namespace oak
