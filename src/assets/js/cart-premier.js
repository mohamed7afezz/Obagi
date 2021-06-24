function calcPremierPoints() {
    if (document.querySelector('#Showbag') != null) {
        const productsTable = document.querySelectorAll('#Showbag');
        productsTable.forEach(table => {
            const products = table.querySelectorAll('.row.selectedproductsCard');
            let premierPointsTotal = 0;

            products.forEach(prod => {

                let nProducts = parseInt(prod.querySelector('.quantatiy-number').innerHTML);
                let points = parseInt(prod.querySelector('.totalpoints').innerHTML);
                console.log('bahi', prod, nProducts, points)
                premierPointsTotal += (nProducts * points);
            })

            document.querySelectorAll('.totalPremierPoints').forEach(prod =>{
                prod.innerHTML = premierPointsTotal;
            })
        })
    } else if (document.querySelector('.productInBag') != null) {
        const productsTable = document.querySelectorAll('.productInBag');
        productsTable.forEach(table => {
           
            if (table.querySelectorAll('.row.alignFlex').length>0) {
                let premierPointsTotal = 0;
            const products = table.querySelectorAll('.row.alignFlex .row.alignFlex');
               
                products.forEach(prod => {
             
                    let nProducts = parseInt(prod.querySelector('.quantatiy-number').innerHTML);
                    
                    let points = parseInt(prod.querySelector('.totalpoints').innerHTML);

                    console.log(nProducts,points)
                    premierPointsTotal += (nProducts * points);
                })
    
                document.querySelectorAll('.totalPremierPoints').forEach(prod =>{
                    prod.innerHTML = premierPointsTotal;
                })
            }
          
        })
    }


}

export default calcPremierPoints;