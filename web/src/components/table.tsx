import axios from "axios"
import { useEffect, useState } from "react";

const TableCharacters = () => {

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState(data);
    const column = [
        { heading: 'Name', value: 'name' },
        { heading: 'Weight', value: 'weight' },
        { heading: 'Height', value: 'height' },
        { heading: 'Blood type', value: 'blood_type' },
        { heading: 'Gender', value: 'gender' },
        { heading: 'Sexuality', value: 'sexuality' },
        { heading: 'Birthday', value: 'birthday' },
        { heading: 'Zodiac sign', value: 'zodiac_sign' },
        { heading: 'MBTI', value: 'mbti' },
        { heading: 'Occupation', value: 'occupation' },
    ]

    let username = localStorage.getItem('username');
    useEffect(() => {
        axios.get(`http://localhost:1111/users/${username}/characters`)
            .then(res => setData(res.data.characters))
            .catch(err => console.log(err));
    }, [])

    const deleteCharacter = (nameCharacter: string) => {
        let delData = data.filter((characters: any) => {                
            return nameCharacter !== characters.name
        });
        axios.post(`http://localhost:1111/users/${username}/characters/${nameCharacter}/delete`)
        setData(delData);
        console.log(delData);
    }

    const TableHeadItem = ({ item }: any) => <th>{item.heading}</th>
    // const TableRow = ({ item, column }: any) => (
    //     <tr>
    //         {column.map((columnItem: any, index: any) => {
    //             return <td>{item[`${columnItem.value}`]}</td>   
    //         })}
    //         <button onClick={() => deleteCharacter()} id={item['name']}>Excluir</button>
    //     </tr>
    // )

    return (
        <table className="text-white w-full">
            <thead>
                <tr>
                    {column.map((item: any) => <TableHeadItem item={item}/>)}
                </tr>
            </thead>

            <tbody>
                {data.map((item: any) => {
                    return (
                        <>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.weight}</td>
                                <td>{item.height}</td>
                                <td>{item.blood_type}</td>
                                <td>{item.gender}</td>
                                <td>{item.sexuality}</td>
                                <td>{item.birthday}</td>
                                <td>{item.zodiac_sign}</td>
                                <td>{item.mbti}</td>
                                <td>{item.occupation}</td>
                                <td>
                                    <button onClick={() => deleteCharacter(item.name)}>Excluir</button>
                                </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableCharacters;