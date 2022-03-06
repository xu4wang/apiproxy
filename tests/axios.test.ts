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

/*
{
    "method": "GET",
    "url": "https://github.com/login/oauth/authorize",
    "data": {},
    "params": {
        "client_id": "7ece5cc78e4fdd3260ae",
        "scope": "email",
        "response_type": "code",
        "redirect_uri": "https://d819-240e-47c-30a8-43ad-c896-3c06-3821-7cd7.ngrok.io/auth/login/github/callback",
        "access_type": "offline",
        "code_challenge": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w",
        "code_challenge_method": "S256",
        "state": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w"
    }
}

  
test('test get via axios', async () => {
  const response = await axios({
    "method": "GET",
    "url": "https://github.com/login/oauth/authorize",
    "data": {},
    "params": {
        "client_id": "7ece5cc78e4fdd3260ae",
        "scope": "email",
        "response_type": "code",
        "redirect_uri": "https://d819-240e-47c-30a8-43ad-c896-3c06-3821-7cd7.ngrok.io/auth/login/github/callback",
        "access_type": "offline",
        "code_challenge": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w",
        "code_challenge_method": "S256",
        "state": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w"
    }
  });
  console.log(response)
})

*/
