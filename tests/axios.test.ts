const axios = require('axios').default;
  
test('test post via axios', async () => {
  const response = await axios({
    method: 'post',
    url: 'https://httpbin.org/anything',
    headers: {
      authorization:"helloworld"
    },
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });
  //console.log(response)
  expect(response.method==='POST')
  expect(response.data["headers"]["Authorization"]==='helloworld')
  expect(response.data["data"]["firstName"]==='Fred')
})


