import http from "@/utils/request";

const apiTest = {
  getTest: (params: GetTest.params) =>
    http.get<GetTest.data>("/twins-service/model/twins/trend", params),
  postTest: (params: PostTest.params) =>
    http.post<PostTest.data>("/twins-service/model/twins/trend", params),
};

export default apiTest;
