import React from 'react'
import SideMenu from '../menu/SideMenu'
import FormInput from '../../../components/inputsfield/FormInput'
import Heading from '../../../components/heading/Heading'
import { useState } from 'react'
import Button from '../../../components/Button/Button'

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'


function CreateOrders() {

    const [cookies] = useCookies();


    const [selectFile, setSelectFile] = useState()

    const [value, setValue] = useState({
        username: '',
        systemSize: "",
        buildingType: "",
        nmiNumber: "",
        panels: "",
        inverter: "",
        roofType: "",
        roofAngle: "",
        meterPhase: "",
        installationType: "",
        panelsQuantity: "",
        inverterQuantity: "",
        otherComponent: "",
        battries: ""
    })

    const { username, systemSize, buildingType, nmiNumber, panels, inverter, roofType, roofAngle, meterPhase, inverterQuantity, installationType, panelsQuantity, otherComponent, battries, panles } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleFile = e => {
        setSelectFile(e.target.files[0])
        console.log(selectFile)
    }

    const createOrders = async (e) => {
        e.preventDefault();
        try {
            const url = "http://13.126.231.119/order/";

            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            const formdata = new FormData();
            formdata.append("username",username)
            formdata.append("system_Size",systemSize)
            formdata.append("building_Type",buildingType)
            formdata.append("nmi_no",nmiNumber)
            formdata.append("panels",panels)

            
            formdata.append("inverter",inverter)
            formdata.append("roof_Type",roofType)
            formdata.append("roof_Angle",roofAngle)
            formdata.append("meter_Phase",meterPhase)
            formdata.append("installation_Type",installationType)
            formdata.append("document_file", selectFile)
            formdata.append("panels_quantity",panelsQuantity)
            formdata.append("inverter_quantity",inverterQuantity)
            formdata.append("other_component",otherComponent)
            formdata.append("batteries", battries)

            const res = await fetch(url, {
                method: "POST",
                headers: myHeaders,
                body: formdata
            })

            const data = await res.json()

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='' style={{ display: 'flex', flexDirection: 'row', }}>
            <div className=''>
                <SideMenu />
            </div>
            <div className="container py-5">
                <div>
                    <Heading heading="Create your order" size="30px" weight="600" color="teal" />
                </div>
                <form onSubmit={createOrders} style={{width: "100%", overflow: 'hidden'}}>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your username..." value={username} name="username" onChange={handleChange} />
                        <Input placeholder="Enter your system size..." value={systemSize} name="systemSize" onChange={handleChange} />
                        <Input placeholder="Enter your building type..." value={buildingType} name="buildingType" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your nmi number..." value={nmiNumber} name="nmiNumber" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your panels..." value={panels} name="panels" onChange={handleChange} />
                        <Input placeholder="Enter your inverter..." value={inverter} name="inverter" onChange={handleChange} />
                        <Input placeholder="Enter your roof type..." value={roofType} name="roofType" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your roof angle..." value={roofAngle} name="roofAngle" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your meter phase..." value={meterPhase} name="meterPhase" onChange={handleChange} />
                        <Input placeholder="Enter your installation type..." value={installationType} name="installationType" onChange={handleChange} />
                        <Input placeholder="Enter your document file..." onChange={handleFile} type="file"/>
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your panels quantity..." value={panelsQuantity} name="panelsQuantity" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4 '>
                        <Input placeholder="Enter your inverter quantity..." value={inverterQuantity} name="inverterQuantity" onChange={handleChange} />
                        <Input placeholder="Enter your other component..." value={otherComponent} name="otherComponent" onChange={handleChange} />
                        <Input placeholder="Enter your battries..." value={battries} name="battries" onChange={handleChange} />
                    </div>
                    <div className='admin__order__input__container flex p-4  justify-end mx-2'>
                        <Button title="Submit" background="orange" color="white" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateOrders