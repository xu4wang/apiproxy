import client,{RequestConfig,ServerResponse} from '../src/lib/http';

const cfg:RequestConfig = {
    method: 'post',
    url: 'https://httpbin.org/anything',
    headers: {
      authorization:"helloworld"
    },
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    },
    params:{}
}

test('test post via http', async () => {
    const r = await client(cfg);
    console.log("LOGGING RESPONSE")
    console.log(r)
    expect(r.data["headers"]["Authorization"]).toBe('helloworld')
    expect(r.data.json["firstName"]).toBe('Fred' )
  }
)
