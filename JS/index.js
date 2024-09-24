let balance = 100000;
    let donationHistory = [];

    function donate(cardNumber, cause) {
        let donationInput = document.getElementById('donation' + cardNumber);
        let donationAmount = donationInput.value;

        if (donationAmount === '') {
            showNotification('Please enter a donation amount !');
            return;
        }

        if (parseFloat(donationAmount) < 0) {
            showNotification('Please enter a positive number !');
            return;
        }
        let totalAmountElement = document.getElementById('total' + cardNumber);
        let totalAmount = parseInt(totalAmountElement.textContent)

        if (parseFloat(donationAmount) > balance) {
            showNotification('Insufficient Balance !');
            return;
        }

        totalAmount += parseFloat(donationAmount);
        totalAmountElement.textContent = totalAmount;
        balance -= parseFloat(donationAmount);
        document.getElementById('balance').textContent = balance;

        const now = new Date();
        const donationDate = now.toLocaleDateString();
        const donationTime = now.toLocaleTimeString();
        donationHistory.push({ cause: cause, amount: parseFloat(donationAmount), date: donationDate, time: donationTime });
        updateHistory();

        document.querySelector('.modal').style.display = 'flex'; // Show modal
    }

    function updateHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        if (donationHistory.length > 0) {
            donationHistory.forEach(donation => {
                const historyItem = document.createElement('div');
                historyItem.classList.add('history-item');
                historyItem.innerHTML = `<strong>Cause:</strong> ${donation.cause}<br><strong>Amount:</strong> ${donation.amount} BDT<br><strong>Date:</strong> ${donation.date}<br><strong>Time:</strong> ${donation.time}`;
                historyList.appendChild(historyItem);
            });
        } else {
            historyList.innerHTML = '<p>No donations yet.</p>';
        }
    }

    function openTab(tab) {
        document.getElementById('donation').style.display = tab === 'donation' ? 'block' : 'none';
        document.getElementById('history').style.display = tab === 'history' ? 'block' : 'none';
        document.querySelectorAll('.tabs button').forEach(button => button.classList.remove('active'));
        document.querySelector(`.tabs button[onclick="openTab('${tab}')"]`).classList.add('active');
    }

    function closeModal() {
        document.querySelector('.modal').style.display = 'none';
    }

    function showNotification(message) {
        alert(message);
    }