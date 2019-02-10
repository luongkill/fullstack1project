
const startPreviewer = () => {
	console.log('Page Loaded')

    
	const fetchData = () => {
		const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=HKNJ99D68IEHX5K1GP12X8B7ZFN16MNCFY`
        return fetch(url)
    }

    fetchData().then(response =>{
        return response.json()

    } ).then( response => {
        var apiData = response.result   
        let n = parseInt(apiData)
        document.getElementById('lastblock').textContent = n + " "+ "\(" + 17 +"\."+5+"\s"+"\)"
        const fetch1 =() => {
            const url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${apiData}&boolean=true&apikey=HKNJ99D68IEHX5K1GP12X8B7ZFN16MNCFY`
            return fetch(url)    
        }
        fetch1().then(function(response) {
               return response.json();
             })
            .then(response => {

                console.log(response)
                var apiData = response.result.difficulty   
                let n = parseInt(apiData)/1000000000000
                let m = Math.round(n*100)/100
                document.getElementById('difficulty').textContent =  m +" "+ "\T"+"\H"


                  
            })


    })


    const fetchData2 = ()=>{
		const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=0x2910543af39aba0cd09dbb2d50200b3e800a63d2&tag=latest&apikey=HKNJ99D68IEHX5K1GP12X8B7ZFN16MNCFY`
        return fetch(url)

    }

    fetchData2().then(response =>{
        console.log(response)
        return response.json()


    } ).then( response => {
        console.log(response)   
        var apiData = response.result   
        let n = parseInt(apiData,16)
        document.getElementById('transactions').textContent = n 
        
    })

    const fetchData3 = (price)=>{
        console.log(price)
		const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=HKNJ99D68IEHX5K1GP12X8B7ZFN16MNCFY`
        return fetch(url)

    }

    fetchData3().then(response =>{
        console.log(response)
        return response.json()


    } ).then( response => {
        console.log(response) 
        
        var ethbtc = response.result.ethbtc
        console.log ('ethbtc', ethbtc)
        var ethusd = response.result.ethusd
        document.getElementById('price').textContent = "\$" + ethusd + " "+"\@"+ethbtc+" "+ "\B\T\C\/\E\T\H"
        

        
        
        
    })

    const fetchData4 = (price)=>{
        console.log(price)
		const url = `https://www.etherchain.org/api/basic_stats`
        return fetch(url)

    }


    fetchData4().then(response =>{
        console.log(response)
        return response.json()


    } ).then( response => { 
        console.log(response) 
           //var dificulty = response.currentStats.dificulty
        var hashrate = response.currentStats.hashrate/1000000000        
        document.getElementById('hashrate').textContent = Math.round(hashrate*100)/100 +" "+"\G\H\/\s"
   
})

const fetchData5 = (searchTerm) => {
    console.log(searchTerm)
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${searchTerm}=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken`
    return fetch(url)
    
}

const form = document.forms['search-form']

form.addEventListener('submit',function(e){
    e.preventDefault()
    var searchTerm = document.getElementById('searchbox').value

    fetchData5(searchTerm).then(response=>{

        if (response.ok) {
            return response.json()
        }
        throw new Error('Api did not respond')
    }).then(response => {

        console.log(response)

        let n = response.result
        document.getElementById('output'). textContent = n
        

        

    })




})

}

window.addEventListener("load", startPreviewer)