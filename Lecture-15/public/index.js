console.log(axios);
/* Function to send get request of comment data using axios
function getComment(URL) {
    axios.get(URL).then((data) => {
        console.log(data);
    })
    .catch(err => console.log(err))
} */

// Writing the same function using async/await
async function getComment(URL) {
    try {
        let response = await axios.get(URL);
        console.log(response.data);    // Axios response 
    } 
    catch (err) {
        console.log(err);
    }
}
getComment("https://jsonplaceholder.typicode.com/comments");   // Fake API

// Function to add new blog 
addBlog("http://localhost:3005/blog", "My first blog", "My first blog description")
async function addBlog(URL, title, description) {
    try {
        let newBlog = {
        title : title,
        description : description
    }
let comment = await axios.post(URL, newBlog);
console.log(comment);
    } catch (err) {
        console.log(err);
    }
}