export default class Pager {
    /**
    * @param data array
    * @param rowsPerPage number of rows to show per page
    */
    constructor (data, rowsPerPage) {
        this.data = data;
        this.rowsPerPage = rowsPerPage;
        this.pagesNumber = Math.ceil(this.data.length / this.rowsPerView);
        this.pagerData = this.data.map(item => {
            let pageData = [];
            for(let i = 0; i < rowsPerPage; i++) {
                pageData.push(item)
            }
            return pageData
        })
        console.log(this.pagerData);
    }

    init() {

    }

    
}
