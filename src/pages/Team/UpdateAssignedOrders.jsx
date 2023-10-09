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

function UpdateAssignedOrders() {

    const [cookies] = useCookies()
    const data = useLocation()

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

    function isDateBeforeToday(date) {
        if(new Date(date.toDateString()) < new Date(new Date().toDateString())){
                return alert('wornfg')
        };
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
            // const id = toast.loading('Please wait....')
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

            // fetch(`https://solar365.co.in/update_grid/${data?.state?.data?.id}/`, requestOptions)
            //     .then(response => response.json())
            //     .then(result => {
            //         setLoading(false)
            //         if (result) {
            //             setSelectDate({
            //                 meterApproveDate: '',
            //                 meterDate: ''
            //             })
            //             setShowState(false)
            //             toast.update(id, { render: 'Grid Information updated...', type: 'success', isLoading: false, autoClose: true })
            //             console.log(result)
            //         }
            //     })
            //     .catch(error => console.log('error', error));
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
                    if (result) {
                        toast.update(id, { render: 'Meter Details updated...', type: 'success', isLoading: false, autoClose: true })
                        console.log(result)

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
                    if (result) {
                        toast.update(id, { render: 'Meter Details updated...', type: 'success', isLoading: false, autoClose: true })
                        console.log(result)
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
                                <label>Meter Date</label>
                                <FormInput type="date" placeholder="Meter Date" onChange={handleChange} name="meterDate" value={meterDate} />
                                <label>Meter Approve Date</label>
                                <FormInput type="date" placeholder="Meter Date" onChange={handleChange} name="meterApproveDate" value={meterApproveDate} />
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
                                <FormInput type="date" placeholder="Meter Date" onChange={handleChange} name="meterDate" value={meterDate} />
                                <FormInput type="date" placeholder="Meter Date" onChange={handleChange} name="meterApproveDate" value={meterApproveDate} />
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
                                <UploadFile id="elect" name="electricityBillFile" value={electricityBillFile} width="100%" label="Electricity Bill" onchange={e => setElectricityBillFile(e.target.files[0])} />
                                <UploadFile id="counc" name="councilRateFile" value={councilRateFile} width="100%" label="Council Rate" onchange={e => setCouncilRateFile(e.target.files[0])} />
                                <UploadFile id="meter" name="meterBoxFile" value={meterBoxFile} width="100%" label="Meterbox" onchange={e => setMeterBoxFile(e.target.files[0])} />
                                <UploadFile id="contact" name="contractFile" value={contractFile} width="100%" label="Contract File" onchange={e => setContractFile(e.target.files[0])} />
                                <UploadFile id="misc" name="miscellaneousFile" value={miscellaneousFile} width="100%" label="Miscellaneous File" onchange={e => setMiscellaneousFile(e.target.files[0])} />
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
                                <UploadFile id="contract" name="contractDocs" value={contractDocs} width="100%" label="Contract Documents" onchange={e => setContractDocs(e.target.files[0])} />
                                <UploadFile id="grid" name="gridApprovalDocs" value={gridApprovalDocs} width="100%" label="Grid Approval Documents" onchange={e => setGridApprovalDocs(e.target.files[0])} />
                                <UploadFile id="compliance" name="complianceDocs" value={complianceDocs} width="100%" label="Compliance Documents" onchange={e => setComplianceDocs(e.target.files[0])} />
                                <UploadFile id="user" name="userManual" value={userManual} width="100%" label="User Mannual" onchange={e => setUserMannual(e.target.files[0])} />
                                <UploadFile id="pvsite" name="pvSiteInfoDocs" value={pvSiteInfoDocs} width="100%" label="Pv Site Info Documents" onchange={e => setPvSiteInfoDocs(e.target.files[0])} />
                                <UploadFile id="energy" name="eneryYieldReportDocs" value={energyYieldReportDocs} width="100%" label="Energy Yield Report Documents" onchange={e => setEnergyYieldReportDocs(e.target.files[0])} />
                                <UploadFile id="safety" name="safetyCertificateDocs" value={safetyCertificateDocs} width="100%" label="Safety Certificate Documents" onchange={e => setSafetyCertificateDocs(e.target.files[0])} />
                                <UploadFile id="noc" name="nocDocs" value={nocDocs} width="100%" label="Noc Documents" onchange={e => setNocDocs(e.target.files[0])} />
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
