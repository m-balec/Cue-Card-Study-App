
// Function to load all cue cards on page load
const getCueCards = async () => {
    try {
        // Awaiting all cue card question/answer pairs from Express server
        const res = await fetch('http://localhost:3001/cards');
        
        // Converting result into usable 'data' array of each object
        const data = await res.json();

        // Getting html container holding all cue cards
        let container = document.getElementById('card_container');
      
        // Adding each item received via the above fetch request to the html page
        data.forEach((item) => {
            container.innerHTML += 
            `<div class="cue_card">
                <h3 id="question">${item.question}</h3>
                <h3 id="answer">${item.answer}</h3>
            </div>`;
        });

    } catch (err) {
        console.log(err);
    }
}