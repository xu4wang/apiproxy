import { gethandler } from '../src/handlers/get';
import { getMockReq, getMockRes } from '@jest-mock/express';

// generate a mocked response and next function, with provided values
const { res, next } = getMockRes({
  })
  
test('will respond with body, headers, params, query', async () => {
  // generate a mock request with params
  const req = getMockReq({ query: { id: 'abc-def' }, headers:{authorization:'this is my token'}, body:{key1:"value1",key2:2} })

  // provide the mock req, res, and next to assert
  await gethandler(req, res)
  
  //the get method should return headers,params and body in the JSON body
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      headers:{authorization: 'this is my token'},
      query:{id:'abc-def'},
      body:{key1:"value1",key2:2}
    }),
  )
})