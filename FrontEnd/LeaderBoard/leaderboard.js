
const url = 'http://localhost:6800';


function addDataToScreen(data, index) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${index + 1}</td><td>${data.username}</td>
       <td>${data.totalexpense}</td>
       `
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}

async function displayLeaderBoard() {
    try {

        let leaderBoardData = await axios.get(`${url}/getAllLeaderboardData`);
        console.log(leaderBoardData)

        leaderBoardData.data.forEach((data, index) => {
            addDataToScreen(data, index)
        })

    } catch (err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', displayLeaderBoard)