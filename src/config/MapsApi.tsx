import axios from 'axios';


const url = "http://api.positionstack.com/v1/forward?access_key=";
const key = "51684534b61a8ce9113517d78cf3bcc5"


const fetchLatLong = (address: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await axios.get(`${url + key}&query=${address}`)
            resolve(res.data.data[0]);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};


export default fetchLatLong