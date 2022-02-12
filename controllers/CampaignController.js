var axios = require('axios');

// Today's date
const today = new Date()
function sortItems(array) {
    const records = []
    array.sort( function ( a, b ) { return b.totalAmount - a.totalAmount; } );
    array.map(r => records.push({title: r.title, totalAmount: r.totalAmount, backersCount: r.backersCount, endDate: r.endDate}))
    return records
}


const fetchCampaingnsSortByAmount = (req, res) => {
    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(response => res.json(sortItems(response.data)))
    .catch(err => console.log(`Unexpected Error while fetching details - ${err}`))
};

const fetchActiveCampaingnsInLastMonth = (req, res) => {
    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(response => {
        console.log('Returning all active campaigns created within last month')
        const lowerBoundDate = new Date(today.valueOf())
        // date set to today's date - 30 days
        lowerBoundDate.setDate(lowerBoundDate.getDate() - 30)
        const lowerDateString = lowerBoundDate.toISOString().split('T')[0]
        res.json(response.data.filter(r =>  new Date(r.endDate).toISOString().split('T')[0] >= today.toISOString().split('T')[0]
                                        && new Date(r.created).toISOString().split('T')[0]  >= lowerDateString 
                                        && new Date(r.created).toISOString().split('T')[0] <= today.toISOString().split('T')[0] ))
    })
    .catch(err => console.log(`Unexpected Error while fetching details - ${err}`))
};


const fetchClosedCampaingns = (req, res) => {
    axios.get('https://testapi.donatekart.com/api/campaign')
    .then(response => {
        console.log('Returning all closed campaigns')
        res.json(response.data.filter(r => new Date(r.endDate).toISOString().split('T')[0] < today.toISOString().split('T')[0] 
                                        || r.procuredAmount >= r.totalAmount))
    })
    .catch(err => console.log(`Unexpected Error while fetching details - ${err}`))
};

module.exports= {fetchCampaingnsSortByAmount, fetchActiveCampaingnsInLastMonth, fetchClosedCampaingns}