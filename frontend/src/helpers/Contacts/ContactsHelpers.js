import axios from 'axios';

class ContactsHelpers {
    static url='http://127.0.0.1:3000/contacts';
    static async create(name,phone) {
        return axios.post(this.url,{
            "name": name,
            "phone": phone,
          }
        )
    }
    static async get(id) {
        return axios.get(this.url+"/"+id);
    }
    static async  all() {
        return axios.get(this.url);
    }
    static async update(id,name,phone) {
        return axios.put(this.url+"/"+id,{
            "name": name,
            "phone": phone,
          }
        )
    }
    static async delete(id) {
        return axios.delete(this.url+"/"+id);
    }
}
  
  export default ContactsHelpers