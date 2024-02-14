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
import RichTextEditor from "@/Components/RichTextEditor";
import { Editor } from "@tinymce/tinymce-react";
import FileUpload from "@/Components/FileUpload";
import MetaDataInput from "@/Components/MetaDataInput";

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

    const baseUrl = "admin.blogs";

    const submit = () => { 

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
    
    const handleEditorChange = (name, content) => { 
      setData(name, content);  
  };

  const handleMetaData=(value)=>{
 
        setData({...data,
            'meta_data':value
        }); 

        console.log(data)
  }

  console.log(data)
    
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Blogs
                    </h2>
                }
            >
                <Head title="Blogs Form" />

                <div className="py-5">
                    <div className=" mx-auto sm:px-6 lg:px-8">
                        <div
                            className={`grid md:grid-cols-3 gap-4`}
                        >
                            <div className="col-span-1 h-screen md:col-span-2">
                                <Card>
                                    <CardHeader>Content</CardHeader> 
                                    <CardBody>
                                         <FormInput type="rich_editor" onChange={handleEditorChange}  name="content" value={data.content} /> 
                                         {/* <RichTextEditor /> */}
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="col-span-1 md:col-span-1">
                            <Card className="mb-5">
                                    <CardHeader>Basic Details</CardHeader>
                                    <CardBody>
                                        <FormInput
                                            name="title"
                                            label="Title"
                                            value={data.title}
                                            error={errors.title}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            name="slug"
                                            label="Slug"
                                            value={data.slug}
                                            error={errors.slug}
                                            disabled
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            name="author"
                                            label="Author"
                                            value={data.author}
                                            error={errors.author}
                                            onChange={handleChange}
                                        />
                                    </CardBody>
                                </Card>
                                <Card className="mb-5">
                                    <CardHeader>Metadata</CardHeader>
                                    <CardBody>
                                        
                                    <MetaDataInput onChange={handleMetaData} value={data.meta_data} />
                                    </CardBody>
                                </Card>
                                <Card className="mb-5">
                                    <CardHeader>Cover image</CardHeader>
                                    <CardBody>
                                        {/* <DropZoneInput 
                                            value={[data.cover_image]}
                                            multiple={false}
                                        /> */}
                                        <FileUpload value={data.cover_image} />
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
                                                <tr>
                                                    <th className="p-2 text-left">
                                                        Created By{" "}
                                                    </th>
                                                    <td className="p-2">
                                                        {data.created_by.name}
                                                    </td>
                                                </tr>
                                            </table>
                                        </CardBody>
                                    </Card>
                            )}
                                </div>

                            
                        </div>
                        <div className="relative">
                            <Card className="mt-5 bottom-0 w-full">
                                <CardBody>
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
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default Form;
