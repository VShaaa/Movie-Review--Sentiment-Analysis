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
            const params = new URLSearchParams({
                sentiment: data.sentiment,
                explanation: data.explanation
            });
            window.location.href = '/result?' + params.toString();
        });

        const res = await fetch('/wordlists');
        const lists = await res.json();
        const posRadio = document.getElementById('positiveRadio');
        const negRadio = document.getElementById('negativeRadio');
        const dropdown = document.getElementById('wordDropdown');
        const container = document.getElementById('dropdownContainer');
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
});


