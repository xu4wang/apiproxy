import { posthandler } from '../src/handlers/post';
import { getMockReq, getMockRes } from '@jest-mock/express';

// generate a mocked response and next function, with provided values
const { res, next } = getMockRes({
  })
  
test('will respond with headers, body, query,params', async () => {
  // generate a mock request with params
  const req = getMockReq({ params: { id: 'abc-def' }, headers:{authorization:'this is my token'}, query:{k:"1",k2:"2"},body:{body_key:"body v", body_key2:2} })

  // provide the mock req, res, and next to assert
  await posthandler(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      headers:{authorization:'this is my token'},
      params:{ id: 'abc-def' },
      query:{k:"1",k2:"2"},
      body:{body_key:"body v", body_key2:2}
    }),
  )
})