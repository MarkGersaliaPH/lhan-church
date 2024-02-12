import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import FormInput from "@/Components/FormInput";
import DangerButton from "@/Components/DangerButton";
import FileUpload from "@/Components/FileUpload";

function Form({ auth, item }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        post,
        processing,
        recentlySuccessful,
    } = useForm(item || {});

    const baseUrl = "admin.branches";

    const submit = (e) => {
        e.preventDefault();

        data.services = JSON.stringify(services);

        console.log(data)
        if (data.id) {
            put(route(`${baseUrl}.update`, data.id), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        } else {
            post(route(`${baseUrl}.store`), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type == "checkbox" ? e.target.checked : e.target.value
        );
    };
 
    let [services, setServices] = useState(data.id ? JSON.parse(data.services) : [{ name: "", description: "" }]);

    const addRow = () => {
        setServices([...services, { name: "", description: "" }]);
    };

    const removeRow = (key) => {
        let newServices = services.filter((service,service_key) => {
            return key != service_key;
        });
 
        setServices(newServices);
    };

    const handleServiceChange = (key,e) =>{
        let newServices = services.filter((service,service_key) => {
            return key == service_key;
        });
        newServices[0][e.target.name] = e.target.value;
        setServices([...services],newServices);
    }

    const handleFileChange = (value)=>{
 
        setData("file",value)
    }
  

    const imageFile = new File([new Blob()], data.cover_image, { type: 'image/jpeg' });
 
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Branches
                    </h2>
                }
            >
                <Head title="Branches Form" />

                <div className="py-5"> 
                    <div className="  mx-auto sm:px-6 lg:px-8">
                        <div
                            className={`grid md:grid-cols-3 gap-4`}
                        >
                            <div className="col-span-1 md:col-span-2">
                                <Card className="mb-5">
                                    <CardBody>
                                        <FormInput
                                            name="name"
                                            label="Name"
                                            value={data.name}
                                            error={errors.name}
                                            onChange={handleChange}
                                        />
                                        <div className="grid md:grid-cols-2 md:gap-4">
                                            <FormInput
                                                className="w-1/2"
                                                name="mobile_no"
                                                label="Mobile Number"
                                                value={data.mobile_no}
                                                error={errors.mobile_no}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                            <FormInput
                                                name="tel_no"
                                                label="Telephone Number"
                                                value={data.tel_no}
                                                error={errors.tel_no}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                        </div>
                                        <FormInput
                                            name="email"
                                            label="Email address"
                                            value={data.email}
                                            error={errors.email}
                                            onChange={handleChange}
                                            type="email"
                                        />
                                        <FormInput
                                            name="address"
                                            label="Address"
                                            value={data.address}
                                            error={errors.address}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            name="head_pastor"
                                            label="Head Pastor"
                                            value={data.head_pastor}
                                            error={errors.head_pastor}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            name="description"
                                            label="Description"
                                            value={data.description}
                                            error={errors.description}
                                            onChange={handleChange}
                                            type="textarea"
                                        />
                                        <FormInput
                                            name="is_main"
                                            label="Is main branch"
                                            value={data.is_main}
                                            error={errors.is_main}
                                            onChange={handleChange}
                                            type="checkbox"
                                        />
                                    </CardBody>
                                </Card>
                                <Card className="my-5">
                                    <CardHeader>Services</CardHeader>
                                    <CardBody>
                                        {services &&
                                            services.map((service, key) => (
                                                <div className="grid md:grid-cols-3 w-full md:gap-4 items-center justify-between 	">
                                                    <FormInput
                                                        name="name"
                                                        label="Name"
                                                        value={service.name}
                                                        onChange={(e)=>handleServiceChange(key,e)}
                                                        type="text"
                                                    />
                                                    <FormInput
                                                        name="description"
                                                        label="Description"
                                                        value={
                                                            service.description
                                                        }
                                                        onChange={(e)=>handleServiceChange(key,e)}
                                                        type="textarea"
                                                        className="h-12"
                                                    />
                                                    <div>
                                                        {key != 0 && (
                                                            <DangerButton
                                                                onClick={() =>
                                                                    removeRow(
                                                                        key
                                                                    )
                                                                }
                                                                className="text-center "
                                                            >
                                                                Remove
                                                            </DangerButton>
                                                        )}
                                                        
                                                        {services.length ==
                                                            key + 1 && (
                                                            <PrimaryButton
                                                                onClick={addRow}
                                                                className="text-center ml-2"
                                                            >
                                                                Add
                                                            </PrimaryButton>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        {" "}
                                        <PrimaryButton
                                            className="mr-2"
                                            onClick={submit}
                                        >
                                            Submit
                                        </PrimaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                router.visit(
                                                    route(`${baseUrl}.index`)
                                                )
                                            }
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="col-span-1 md:col-span-1">
                                <Card className="mb-5">
                                    <CardHeader>Cover image</CardHeader>
                                    <CardBody>
                                        <FileUpload value={data.cover_image} onChange={(value)=>handleFileChange(value)}  />
                                    </CardBody>
                                </Card>
                                {data.id && (
                                    <div> 
                                    <Card>
                                        <CardBody>
                                            <table className="w-full">
                                                <tr>
                                                    <th className="p-2 text-left">
                                                        Created at
                                                    </th>
                                                    <td className="p-2">
                                                        {data.created_at}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="p-2 text-left">
                                                        Last Updated{" "}
                                                    </th>
                                                    <td className="p-2">
                                                        {data.updated_at}
                                                    </td>
                                                </tr>
                                            </table>
                                        </CardBody>
                                    </Card>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default Form;
