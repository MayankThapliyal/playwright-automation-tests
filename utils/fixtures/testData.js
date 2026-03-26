// utils/fixtures/testData.js
export const users = {
    valid:{
        username: 'standard_user',
        password: 'secret_sauce'
    },
    locked:{
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    problem:{
        username: 'problem_user',
        password: 'secret_sauce'
    },
    performance:{
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    },
    error:{
        username: 'error_user',
        password: 'secret_sauce'
    },
    visual:{
        username: 'visual_user',
        password: 'secret_sauce'
    }
};
export const checkout = {
    firstName:'John',
    lastName: 'Doe',
    postalCode: '12345'
};

export const testCases = [
    {
        firstName:'John',
        lastName: 'Doe',
        postalCode: '12345',
    },  
    {
        firstName:'Jane',
        lastName: 'Smith',
        postalCode: '14345',
    },
    {
        firstName:'Bob',
        lastName: 'John',
        postalCode: '11345',
    },

];