document.addEventListener('DOMContentLoaded', async function() {
    if (document.getElementById('reviewForm')) {
        document.getElementById('reviewForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const review = document.getElementById('reviewText').value;
            const experienceField = document.getElementById('experienceText');
            const experience = experienceField ? experienceField.value : '';
            const fullReview = review + ' ' + experience;
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ review: fullReview })
            });
            const data = await response.json();
            localStorage.setItem('sentiment', data.sentiment);
            localStorage.setItem('explanation', data.explanation);
            window.location.href = '/result';
        });

        const res = await fetch('/wordlists');
        const lists = await res.json();
        const posRadio = document.getElementById('positiveRadio');
        const negRadio = document.getElementById('negativeRadio');
        const dropdown = document.getElementById('wordDropdown');
        const container = document.getElementById('dropdownContainer');
        const explanationContainer = document.getElementById('explanationContainer');
        const reviewText = document.getElementById('reviewText');

        posRadio.addEventListener('change', function() {
            if (posRadio.checked) {
                container.style.display = 'block';
                populateDropdown(lists.positive);
            }
        });

        negRadio.addEventListener('change', function() {
            if (negRadio.checked) {
                container.style.display = 'block';
                populateDropdown(lists.negative);
            }
        });

        dropdown.addEventListener('change', function() {
            const selectedWord = dropdown.value;
            if (selectedWord) {
                reviewText.value = selectedWord;
                if (explanationContainer) {
                    explanationContainer.style.display = 'block';
                }
            }
        });

        function populateDropdown(words) {
            dropdown.innerHTML = "";
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "--Select--";
            dropdown.appendChild(defaultOption);
            words.forEach(word => {
                let option = document.createElement('option');
                option.value = word;
                option.textContent = word;
                dropdown.appendChild(option);
            });
        }
    }

    if (document.getElementById('sentiment')) {
        document.getElementById('sentiment').textContent = 'Sentiment: ' + localStorage.getItem('sentiment');
        document.getElementById('explanation').textContent = 'Explanation: ' + localStorage.getItem('explanation');
    }
});

