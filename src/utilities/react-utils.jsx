export  const printNames = () =>{
    const names = ['kevin','jay'];
    return (
        <ul>
        {names.map((e) => (
                <li>{e}</li>
            ))}
        </ul>


    )
}