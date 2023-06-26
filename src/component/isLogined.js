const isLogined = () =>



    !!sessionStorage.getItem('JWT-TOKEN')


export default isLogined;