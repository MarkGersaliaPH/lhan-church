import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import FormInput from "@/Components/FormInput";
import DateInput from "@/Components/DateInput";
import FileUpload from "@/Components/FileUpload";

function Form({ auth, item,branches }) {
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

    const baseUrl = "admin.events";

    const submit = (e) => {
        e.preventDefault(); 

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

    console.log(data)

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDateChange = (datePickerValue) => {
        setData({...data,
        start_date:datePickerValue.startDate,
        end_date:datePickerValue.endDate
        });
    };

    const handleEditorChange = (name, content) => {
        setData(name, content);
    };

    let branchesOptions = branches.map((branch,key)=>{
        return {label:branch.name,value:branch.id}
    })

 
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Events
                    </h2>
                }
            >
                <Head title="Events Form" />

                <div className="py-5">
                    <div className="  mx-auto sm:px-6 lg:px-8">
                        <div className={`grid md:grid-cols-3 gap-4`}>
                            <div className="col-span-1 md:col-span-2">
                                <Card className="mb-5">
                                    <CardBody>
                                        <FormInput
                                            name="title"
                                            label="Title"
                                            value={data.title}
                                            error={errors.title}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            name="address"
                                            label="Location"
                                            value={data.address}
                                            error={errors.address}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            className="w-1/2"
                                            name="title"
                                            label="Date"
                                            value={{
                                                start_date: data.start_date,
                                                end_date: data.end_date,
                                            }}
                                            error={errors.title}
                                            onChange={handleDateChange}
                                            type="date"
                                        />
                                        <FormInput
                                            type="rich_editor"
                                            label="Event Description"
                                            onChange={handleEditorChange}
                                            name="description"
                                            value={data.description}
                                        />
                                    </CardBody>
                                    <CardFooter>
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
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="col-span-1 md:col-span-1">
                            <Card className="mb-5">
                                    <CardHeader>Cover image</CardHeader>
                                    <CardBody>
                                        <FileUpload value={data.cover_image} />
                                    </CardBody>
                                </Card><Card className="mb-5">
                                    <CardHeader>Assign to Branch</CardHeader>
                                    <CardBody>
                                        
                                    <FormInput
                                            type="select"
                                            label="Branch"
                                            onChange={handleChange}
                                            name="branch_id"
                                            value={data.branch_id}
                                            options={branchesOptions}
                                        />
                                    </CardBody>
                                </Card>
                            {data.id && (
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
