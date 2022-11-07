const deleteBtn = document.querySelectorAll('.fa-trash')
const movie = document.querySelectorAll('.movie span')
const movieWatched = document.querySelectorAll('.fa-check')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteMovie)
})

/*Array.from(movie).forEach((element) => {
    element.addEventListener('click',markWatched)
})*/

Array.from(movieWatched).forEach((element) => {
   element.addEventListener('click', (e)=>{ markUnWatched(e);})
})


async function deleteMovie() {
    const movieText = this.parentNode.childNodes[1].innerText;
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


async function markWatched(){
    const movieText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch 
        ('markWatched', { 
            method: 'put', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieFromJS': movieText
            })
        })
        const data = await response.json() 
        console.log(data)
        location.reload()

    }catch (err) {
        console.log(err)
    }
}


async function markUnWatched(event){

    const isComplete = event.target.parentNode.querySelector('span.status').classList.contains('complete');
    const movieText = event.target.parentNode.querySelector('span.status').innerText
    try {
        const response = await fetch 
        ('markUnWatched', {
            method: 'put',
            header: {'Content-Type': 'application/json'}, 
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