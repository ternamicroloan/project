import bcrypt from 'bcryptjs'

const lenders=[
    {
        name:'Aditya',
        email_address:'aditya@lender.com',
        password:bcrypt.hashSync('1234',10),
        address:'1704 A-wing',
        city:'Thane',
        state:'Maharashtra',
        zipcode:400601,
        mobile_number:9999900000,
        adhaar_number:3000000000,
        verified:false,
        profile_image:''
    },
    {
        name:'Jay',
        email_address:'jay@lender.com',
        password:bcrypt.hashSync('1235',10),
        address:'1704 B-wing',
        city:'Nashik',
        state:'Maharashtra',
        zipcode:400701,
        mobile_number:9999911111,
        adhaar_number:3000011111,
        verified:true,
        profile_image:''
    },
    {
        name:'Vinay',
        email_address:'vinay@lender.com',
        password:bcrypt.hashSync('1236',10),
        address:'1704 C-wing',
        city:'Nerul',
        state:'Maharashtra',
        zipcode:400801,
        mobile_number:9999922222,
        adhaar_number:3000022222,
        verified:false,
        profile_image:''
    },
    {
        name:'Sushant ',
        email_address:'sushant@lender.com',
        password:bcrypt.hashSync('1237',10),
        address:'1704 D-wing',
        city:'Vashi',
        state:'Maharashtra',
        zipcode:400901,
        mobile_number:9999933333,
        adhaar_number:3000033333,
        verified:true,
        profile_image:''
    }
]

export default lenders