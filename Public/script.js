
//var data;

// Function to load all cue cards on page load
const getCueCards = async () => {
    try {
        // Awaiting all cue card question/answer pairs from Express server
        const res = await fetch('http://localhost:3001/cards');
        
        // Converting result into usable 'data' array of each object
        const data = await res.json();

        // Getting html container holding all cue cards
        let container = document.getElementById('cardContainer');
      
        // Adding each item received via the above fetch request to the html page
        data.forEach((item) => {
            container.innerHTML += 
            `<div class="cueCard">
                <h3 id="question">${item.question}</h3>
                <h3 id="answer">${item.answer}</h3>
            </div>`;
        });

    } catch (err) {
        console.log(err);
    }
}

// send delete method from html
// Delete cue card
const deleteCard = async () => {
    try {
        
        // re-fetching the data because I cannot seem to be able to access existing data array regardless of where I declare it
        const res = await fetch('http://localhost:3001/cards');
        const data = await res.json();

        let index = null;
        let questionSearch = document.getElementById('questionSearch').value;


        // Very unsatisfactory way to get the id of the object but jquery did not seem to work for selecting the exact item clicked on
        data.forEach((item) => {
            if (item.question == questionSearch) {
                index = item._id;
            }
        });
        
        // sending fetch request to the delete route
        if (index) {
            const res2 = await fetch(`http://localhost:3001/${index}`, {
                method: 'DELETE',
            });
        }

    } catch (err) {
        console.log(err);
    }
}