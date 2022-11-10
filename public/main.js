const deleteBtn = document.querySelectorAll('.fa-trash')
const movieWatched = document.querySelectorAll('.status')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', (e) => {deleteMovie(e);})
})


Array.from(movieWatched).forEach((element) => {
   element.addEventListener('click', (e)=>{ toggleWatched(e);})
})


async function deleteMovie(event) {
    const movieText = event.target.parentNode;
    console.log(movieText)
    try {
        const response = await fetch ('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ 
                'movieFromJS': movieText,
        })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}



async function toggleWatched(event){

    const isComplete = event.currentTarget.classList.contains('completed') ?? false;
    const movieText = event.currentTarget.querySelector('span.movieName').innerText

    try {
        const response = await fetch 
        ('toggleWatched', {
            method: 'put',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                'movieFromJS': movieText,
                'isComplete': !isComplete
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}