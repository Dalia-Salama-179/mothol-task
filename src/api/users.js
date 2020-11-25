import Axios from "axios";
import Vuex from '@/store/index'

export default {
    /**
     * Get all brands
     * @param {string} listName
     * @api {POST} https://www.keden-edu.com/kntra/api/${listName}/dropdown/list
     */
    getFilterList(listName) {
        return new Promise((resolve) => {
            Axios.post(`https://www.keden-edu.com/kntra/api/${listName}/dropdown/list`, {

            }, {
                headers: {
                    'Authorization': 'Bearer '+ Vuex.state.token
                }
            }).then(res => {
                resolve(res.data.data[listName + '_list'])
            });
        })
    },

    /**
     * Get all regions assigned to specific country
     * @api {POST} https://www.keden-edu.com/kntra/api/regions/dropdown/list/:country_id
     * @param {number} country_id
     */
    getRegions(country_id) {
        return new Promise((resolve) => {
            Axios.post(`https://www.keden-edu.com/kntra/api/regions/dropdown/list/${country_id}`, {

            }, {
                headers: {
                    'Authorization': 'Bearer '+ Vuex.state.token
                }
            }).then(res => {
                resolve(res.data.data)
            });
        })
    },

    /**
     * Add and edit user
     * @api {POST} https://www.keden-edu.com/kntra/api/users/:id/save
     * @param {number} id
     * @param {object} data
     */
    submitUser(id, data) {
        return new Promise((resolve, reject) => {
            Axios.post(`https://www.keden-edu.com/kntra/api/users/${id}/save`, {
                ...data
            }, {
                headers: {
                    'Authorization': 'Bearer '+ Vuex.state.token
                }
            }).then(res => {
                resolve(res.data.data)
            })
                .catch(errors => {
                    reject(errors.response.data.errors)
                })
        })
    },

    /**
     * Change user status
     * @api {POST} https://www.keden-edu.com/kntra/api/users/:id/change_status
     * @param {number} id
     * @returns {Promise} represents changing status response
     */
    changeStatus(id) {
        return new Promise((resolve, reject) => {
            Axios.post(`https://www.keden-edu.com/kntra/api/users/${id}/change_status`, {

            }, {
                headers: {
                    'Authorization': 'Bearer '+ Vuex.state.token
                }
            }).then(res => {
                resolve(res.data.data)
            })
                .catch(errors => {
                    reject(errors.response.data.errors)
                })
        })
    },
}