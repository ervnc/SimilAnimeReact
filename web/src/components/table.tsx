import axios from "axios"
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useEffect, useState } from "react";
import "../components/css/dialog.css";
import "../components/css/button_table.css";
import { Link } from "react-router-dom";

const TableCharacters = () => {

    const [data, setData] = useState([]);
    const column = [
        { heading: 'Image', value: 'image'},
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
        { heading: 'Similarity', value: 'similarity' },
        { heading: '', value: ''}
    ]

    let username = localStorage.getItem('username');
    useEffect(() => {
        axios.get(`http://localhost:1111/users/${username}/characters`)
            .then(res => setData(res.data.characters))
            .catch(err => console.log(err));
    }, [])

    const [deleteCharacterDialog, setDeleteCharacterDialog] = useState(false);
    const [character, setCharacter] = useState("");

    const deleteCharacter = () => {
        let delData = data.filter((characters: any) => {                
            return character !== characters.name
        });
        axios.post(`http://localhost:1111/users/${username}/characters/${character}/delete`)
        setData(delData);
        setDeleteCharacterDialog(false);
        window.location.reload();
    }

    const confirmDeleteCharacter = (characterName: any) => {
        setCharacter(characterName);
        setDeleteCharacterDialog(true);
    }

    const hideDeleteCharacterDialog = () => {
        setDeleteCharacterDialog(false);
    }

    const deleteCharacterDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCharacterDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCharacter} />
        </React.Fragment>
    );


    const TableHeadItem = ({ item }: any) => <th className="p-4 border-b border-neutral-800">{item.heading}</th>

    return (
        <div className="p-12">

            <table className="text-white w-full border-collapse">
                <caption className="text-left p-6 text-xl border-b border-neutral-600 bg-[#222020] rounded-t-xl">Characters</caption>
                <thead className="bg-[#222020]">
                    <tr>
                        {column.map((item: any) => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item: any) => {
                        return (
                            <>
                                <tr>
                                    <td className="border-b border-neutral-600 p-4 text-center">
                                        <img src={item.image == "" ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : item.image}
                                            className="rounded-full"
                                        />
                                    </td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.name}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.weight}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.height}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.blood_type}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.gender}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.sexuality}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.birthday}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.zodiac_sign}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.mbti}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.occupation}</td>
                                    <td className="border-b border-neutral-600 p-4 text-center">{item.similarity}%</td>
                                    <td className="border-b border-neutral-600 p-4 text-center buttonTable">
                                        <Link to={`/edit_character/${item.name}`}>
                                            <Button icon="pi pi-pencil" className="p-button-rounded mr-2 p-button-warning" aria-label="Pencil" />
                                        </Link>
                                        <Button icon="pi pi-trash" className="p-button-rounded mr-2 p-button-danger" aria-label="Trash" onClick={() => confirmDeleteCharacter(item.name)} />
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>

            <Dialog visible={deleteCharacterDialog} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} header="Confirm" modal footer={deleteCharacterDialogFooter} onHide={hideDeleteCharacterDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {character && <span>Are you sure you want to delete <b>{character}</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default TableCharacters;