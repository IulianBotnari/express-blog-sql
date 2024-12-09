axios.get("http://127.0.0.1:3000/posts")
    .then(response => {
        const posts = response.data

        let counter = 0
        posts.forEach(element => {
            const bodyEL = document.querySelector("body")
            const singlePost = element
            let { title, slug, content, image, tags } = singlePost
            counter += 1

            let markup = `
                <h1>Post ${counter}</h1>
                <p>${title}</p>
                <p>${slug}</p>
                <p>${content}</p>
                <img src="${image}" alt="Immagine" width="500">
                <p>${tags.join(" ")}</p>
            `
            bodyEL.insertAdjacentHTML("beforeend", markup)
        });


    }
    )
    .catch(error => {
        console.error(`Error: ${error}`)
    })








