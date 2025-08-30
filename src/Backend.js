export async function Backend(method,controller,data) {
    const url = "http://localhost:8080/"+controller;
    console.log(method,data,url);
    // let response;
    return  fetch(url, {method: method,headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)})
    .then(response => response.json())  // Parses response as JSON
    .then(data => {
        console.log(data);
        try{
        data=[[...data], [{"status": "success"}]];
        }
        catch(e){
            data = {...data, "status": "success"};
        }
        return data;  
    })
    .catch(error => {
        console.error("Error:", error)
        return { "status": "error"};
    });
}