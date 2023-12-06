import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Line from '../../components/heading/Line';
import { useState } from 'react';
import FormInput from '../../components/inputsfield/FormInput';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import UploadFile from '../../components/inputsfield/UploadFile';
import Input from '../../components/inputsfield/Input';

function UpdateAssignedOrders() {

    const [cookies] = useCookies()
    const data = useLocation()

    const [todayDate, setTodayDate] = useState(new Date().toISOString().slice(0, 10))
    const [orderDetails, setOrderDetails] = useState({})
    const [showState, setShowState] = useState(false)
    const [showPresite, setShowPresite] = useState(false)
    const [showMeter, setShowMeter] = useState(false)
    const [showInstall, setShowInstall] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectDate, setSelectDate] = useState({
        meterDate: '',
        meterApproveDate: ''
    })

    const [electricityBillFile, setElectricityBillFile] = useState(null)
    const [councilRateFile, setCouncilRateFile] = useState(null)
    const [miscellaneousFile, setMiscellaneousFile] = useState(null)
    const [meterBoxFile, setMeterBoxFile] = useState(null)
    const [contractFile, setContractFile] = useState(null)

    const [contractDocs, setContractDocs] = useState(null)
    const [gridApprovalDocs, setGridApprovalDocs] = useState(null)
    const [complianceDocs, setComplianceDocs] = useState(null)
    const [userManual, setUserMannual] = useState(null)
    const [pvSiteInfoDocs, setPvSiteInfoDocs] = useState(null)
    const [energyYieldReportDocs, setEnergyYieldReportDocs] = useState(null)
    const [safetyCertificateDocs, setSafetyCertificateDocs] = useState(null)
    const [nocDocs, setNocDocs] = useState(null)

    const { meterApproveDate, meterDate } = selectDate

    const handleChange = e => {
        setSelectDate({ ...selectDate, [e.target.name]: e.target.value })
    }

    const fetchUpdateGrid = (e) => {
        e.preventDefault()

        if(new Date(meterDate).valueOf() < new Date().valueOf()){
            return alert('Please select valid date!')
        }
        if(new Date(meterApproveDate).valueOf() < new Date().valueOf()){
            return alert('Please select valid date!')
        }
        try {
            const id = toast.loading('Please wait....')
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("meter_date",orderDetails?.grid_approval?.meter_date === null ? meterDate : orderDetails?.grid_approval?.meter_date);
            formdata.append("meter_Approved_date",orderDetails?.grid_approval?.meter_Approved_date === null ? meterApproveDate : orderDetails?.grid_approval?.meter_Approved_date);
            formdata.append("energy_provider", "Energy");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_grid/${data?.state?.data?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result) {
                        setSelectDate({
                            meterApproveDate: '',
                            meterDate: ''
                        })
                        setShowState(false)
                        toast.update(id, { render: 'Grid Information updated...', type: 'success', isLoading: false, autoClose: true })
                        console.log(result)
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpdatePresite = e => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("roof_structure", "Fragile/Brittle, None");
            formdata.append("select_hazards", "Pets");
            formdata.append("approximate_age", "0 to 5");
            formdata.append("hazards", "Yes");
            formdata.append("document_attachment", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2023-04-11 15-05-56.png");
            formdata.append("moss", "Yes");
            formdata.append("moss_comment", "fdhsgffgh");
            formdata.append("high_tension", "Yes");
            formdata.append("high_tension_attachment", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-54-38.png");
            formdata.append("damaged_severley", "Yes");
            formdata.append("roof_damage", "Yes");
            formdata.append("any_damage", "Yes");
            formdata.append("vehicle_activities", "Yes");
            formdata.append("asbestos_presence", "Yes");
            formdata.append("safety_concerns", "Yes");
            formdata.append("safety_concerns_comment", "sghdfjghfjhdgjhgasye");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_presite/${data?.state?.data?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } catch (e) {
            console.log(error)
        }
    }

    const fetchUpdateMeter = e => {
        e.preventDefault()
        console.log('elec -->', electricityBillFile)
        try {
            const id = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("electricity_bill", electricityBillFile);
            formdata.append("council_rate", councilRateFile);
            formdata.append("miscellaneous_file", miscellaneousFile);
            formdata.append("meter_box", meterBoxFile);
            formdata.append("contract_file", contractFile);

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/upload_meter_docs/${data?.state?.data?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('photos',result)
                    if (result) {
                        toast.update(id, { render: 'Meter Details updated...', type: 'success', isLoading: false, autoClose: true })
                        return
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchInstallDocs = e => {
        e.preventDefault()
        try {
            console.log('done')
            const id = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("contract_docs", contractDocs);
            formdata.append("grid_approval_docs", gridApprovalDocs);
            formdata.append("compliance_docs", complianceDocs);
            formdata.append("user_manual", userManual);
            formdata.append("pv_site_info_docs", pvSiteInfoDocs);
            formdata.append("energy_yield_report_docs", energyYieldReportDocs);
            formdata.append("safety_certificate_docs", safetyCertificateDocs);
            formdata.append("noc_docs", nocDocs);

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_install_docs/${data?.state?.data?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('install',result)
                    if (result) {
                        toast.update(id, { render: 'Meter Details updated...', type: 'success', isLoading: false, autoClose: true })
                        return
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOrder = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ; sessionid=gxzztx05okbwr01oti653d1rovjsx37z");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/order/${data?.state?.data?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setOrderDetails(result)
                    console.log('order',result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchOrder()
    
        return () => [subscribe]
      },[])

    return (
        <>
            <div style={{ width: "100%", padding: '20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
                    <div className='accordian__box'>
                        <div className='accordian__question' onClick={() => setShowState(!showState)}>Update Grid
                            {
                                !showState ?
                                    <AiOutlinePlus size={40} onClick={() => setShowState(true)} style={{ transition: '0.3s' }} /> :
                                    <AiOutlineMinus size={40} onClick={() => setShowState(false)} style={{ transition: '0.3s' }} />
                            }
                        </div>
                        <div style={{ height: showState ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                            <form style={{ margin: '20px auto' }} onSubmit={fetchUpdateGrid}>
                                <Input type="date" placeholder="Meter Date" onChange={handleChange} name="meterDate" value={orderDetails?.grid_approval?.meter_date === "" ? meterDate : orderDetails?.grid_approval?.meter_date} min={todayDate} disabled={orderDetails?.grid_approval?.meter_date === "" ? true : false}/>
                                <Input type="date" placeholder="Meter Approve Date" onChange={handleChange} name="meterApproveDate" value={orderDetails?.grid_approval?.meter_Approved_date === "" ? meterApproveDate : orderDetails?.grid_approval?.meter_Approved_date} min={todayDate} disabled={orderDetails?.grid_approval?.meter_Approved_date === "" ? true : false}/>
                                <Button type="submit" title="Submit" background="gray" width="100%" margin="10px 10px" />
                            </form>
                        </div>
                    </div>
                    <div className='accordian__box'>
                        <div className='accordian__question' onClick={() => setShowPresite(!showPresite)}>Update Presite
                            {
                                !showPresite ?
                                    <AiOutlinePlus size={40} onClick={() => setShowPresite(true)} style={{ transition: '0.3s' }} /> :
                                    <AiOutlineMinus size={40} onClick={() => setShowPresite(false)} style={{ transition: '0.3s' }} />
                            }
                        </div>
                        <div style={{ height: showPresite ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                            <form style={{ margin: '20px auto' }} onSubmit={fetchUpdatePresite}>
                                <Input type="date" placeholder="Meter Date" onChange={handleChange} name="meterDate" value={meterDate} />
                                <Input type="date" placeholder="Meter Date" onChange={handleChange} name="meterApproveDate" value={meterApproveDate} />
                                <Button type="submit" title="Submit" background="gray" width="100%" margin="10px 10px" />
                            </form>
                        </div>
                    </div>
                    <div className='accordian__box'>
                        <div className='accordian__question' onClick={() => setShowMeter(!showMeter)}>Update Meters
                            {
                                !showMeter ?
                                    <AiOutlinePlus size={40} onClick={() => setShowMeter(true)} style={{ transition: '0.3s' }} /> :
                                    <AiOutlineMinus size={40} onClick={() => setShowMeter(false)} style={{ transition: '0.3s' }} />
                            }
                        </div>
                        <div style={{ height: showMeter ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                            <form style={{ margin: '20px auto' }} onSubmit={fetchUpdateMeter}>
                                <Input type="file" placeholder="Electricity Bill" id="elect" width="100%" onChange={e => setElectricityBillFile(e.target.files[0])} />
                                <Input type="file" placeholder="Council Rate" onChange={e => setCouncilRateFile(e.target.files[0])} />
                                <Input type="file" placeholder="Meterbox" onChange={e => setMeterBoxFile(e.target.files[0])} />
                                <Input type="file" placeholder="Contract File" onChange={e => setContractFile(e.target.files[0])} />
                                <Input type="file" placeholder="Miscellaneous File" onChange={e => setMiscellaneousFile(e.target.files[0])} />
                                <Button type="submit" title="Submit" background="gray" width="100%" margin="10px 10px" />
                            </form>
                        </div>
                    </div>
                    <div className='accordian__box'>
                        <div className='accordian__question' onClick={() => setShowInstall(!showInstall)}>Update Installation Documents
                            {
                                !showInstall ?
                                    <AiOutlinePlus size={40} onClick={() => setShowInstall(true)} style={{ transition: '0.3s' }} /> :
                                    <AiOutlineMinus size={40} onClick={() => setShowInstall(false)} style={{ transition: '0.3s' }} />
                            }
                        </div>
                        <div style={{ height: showInstall ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                            <form style={{ margin: '20px auto' }} onSubmit={fetchInstallDocs}>
                                <Input type="file" placeholder="Contract Documents" onChange={e => setContractDocs(e.target.files[0])} />
                                <Input type="file" placeholder="Grid Approval Documents" onChange={e => setGridApprovalDocs(e.target.files[0])} />
                                <Input type="file" placeholder="Compliance Documents" onChange={e => setComplianceDocs(e.target.files[0])} />
                                <Input type="file" placeholder="User Mannual" onChange={e => setUserMannual(e.target.files[0])} />
                                <Input type="file" placeholder="Pv Site Info Documents" onChange={e => setPvSiteInfoDocs(e.target.files[0])} />
                                <Input type="file" placeholder="Energy Yield Report Documents" onChange={e => setEnergyYieldReportDocs(e.target.files[0])} />
                                <Input type="file" placeholder="Safety Certificate Documents" onChange={e => setSafetyCertificateDocs(e.target.files[0])} />
                                <Input type="file" placeholder="Noc Documents" onChange={e => setNocDocs(e.target.files[0])} />
                                <Button type="submit" title="Submit" background="gray" width="100%" margin="10px 10px" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateAssignedOrders
