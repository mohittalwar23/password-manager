import {create} from 'zustand'
import axiosInstance from "../axios/axios.js";


const usePasswordStore = create((set)=>({
     savedPasswords:[],
     // generatedPassword:null,
     isSavingPassword:false,
     // generatePassword:async(formData)=>{
     //      set({generatedPassword:null})
     //      try {
     //           const res = await axiosInstance.post('/home/generate-password', formData);
     //           set({generatedPassword:res.data.password})
     //      } catch (error) {
     //           console.log("Error while generating password: ",error.message);  
     //      }
     // },
     savePasswordData:async(formData)=>{
          set({isSavingPassword:true})
          try {
               await axiosInstance.post('/home/save-password',formData)
          } catch (error) {
               console.log("Error while saving password.",error.message);
          }finally{set({isSavingPassword:false})}
     },
     showSavedPasswords:async()=>{
          try {
               const res = await axiosInstance.get('/home/show-password')
               set({savedPasswords:res.data.data})
          } catch (error) {
               console.log("Error while showing passwords: ",error.message);
          }
     },
     deletePassword:async(id)=>{
          try {
               await axiosInstance.delete(`/home/delete-password/${id}`, { data: { id } })
               set((state) => ({
                 savedPasswords: state.savedPasswords.filter((p) => p._id !== id),
               }));
          } catch (error) {
               console.log("Error while deleting password: ",error.message);
          }
     },
     updatePassword:async(id,formData)=>{
          try {
               await axiosInstance.put(`/home/update-password/${id}`,formData)
               set((state) => ({
                    savedPasswords: state.savedPasswords.map((p) =>
                         p._id === id ? { ...p, ...formData } : p
                    ),
               }));
          } catch (error) {
               console.log("Error while updating password: ",error.message);
          }
     },

}))
export default  usePasswordStore