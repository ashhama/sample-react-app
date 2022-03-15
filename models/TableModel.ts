class TableModel {
    id: string;
    name: string;
    email: string;
    serviceType: string;
    date: string;
    time: string;
    
  
    constructor(id: string, name: string, email: string, serviceType: string, date: string, time: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.serviceType = serviceType;
      this.date = date;
      this.time = time;
    }
  }
  
  export default TableModel;