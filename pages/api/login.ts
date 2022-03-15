
async function handler(req:any, response:any){
    if(req.method == 'POST'){
        const data = req.body;

        const {email, password} = data;

        if(!email || !password){
            response.status(400).send({
                message: 'Email and password are required'
            });
        } else {
            const user = {
                email,
                password
            };

            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2jNdBX2npCpYivKu40sbuioE-5NfwZys",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                }
              )
                .then((res) => {
                  const resJson = res.json();
                  if(!res.ok){
                    resJson.then(res => {
                    response.status(400).send({
                    message: res.error.message
                });
            });
                    
                        
                  } else{
                    resJson.then(res => {
                        response.status(200).send({
                            user: res.email,
                            token : res.idToken
                        
                      })
                    });
                    
                   
                    
                    
                    
                  }
                  
                })
                .catch((err) => {
                  console.log("RESPONSE.ERROR: ", err);
                });

            
        }

        /*
      

        */

    }
}

export default handler;