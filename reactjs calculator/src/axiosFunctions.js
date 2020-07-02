import axios from 'axios';

export const postCalculation = (calculation) => {
    return axios.post('http://localhost/php_rest_myapi/api/calculations/create.php',
        { equation: calculation })
        .then(response => {
            return response.data;
        }).catch(function (error) {
            return error.response;
        });
};

export const getCalcHistory = () => {
    return axios.get('http://localhost/php_rest_myapi/api/calculations/read.php')
        .then(response => {
            return response.data.data;
        })
        .catch(function (error) {
            return error;
        });
};