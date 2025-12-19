- [streamText](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response.response-init%20&%20ui-message-stream-options)
  - `toTextStreamResponse()`
    - 순수 텍스트 스트림 반환 (Server-Sent Events)
    - `useCompletion` 훅과 사용
    - 단순 텍스트 생성/스트리밍에 적합
  - `toUIMessageStreamResponse()`
    - UI 메시지 스트림 반환 (채팅 메시지 형식)
    - `useChat` 훅과 사용 (role, content, tool_calls 등 포함)
    - 채팅 UI에 필수
  - `toUIMessageStream()`
    - `toUIMessageStreamResponse()`와 차이 없음

- [Edge vs Serverless](https://vercel.com/blog/edge-functions-generally-available)

  | 구분                           | **Edge Function**                 | **Serverless Function (Node.js)** |
  | ------------------------------ | --------------------------------- | --------------------------------- |
  | 실행 위치                      | 사용자와 가까운 **Edge 네트워크** | 특정 리전의 서버                  |
  | 실행 환경                      | V8 isolate (Web API)              | Node.js                           |
  | Cold start                     | 거의 없음                         | 있음                              |
  | Free 플랜 최대 실행 시간       | **30초**                          | **10초**                          |
  | 스트리밍 응답                  | **매우 적합**                     | 부적합 (Free 기준)                |
  | 지연(latency)                  | **아주 낮음**                     | 상대적으로 높음                   |
  | DB 접근 (Prisma 등)            | ❌ 거의 불가                       | **✅ 적합**                        |
  | Node 전용 API (`fs`, `Buffer`) | ❌                                 | **✅**                             |
  | 무거운 비즈니스 로직           | ❌                                 | **✅**                             |
  | 주요 용도                      | AI 채팅, 실시간 응답              | DB, 결제, 크레딧, 정산            |