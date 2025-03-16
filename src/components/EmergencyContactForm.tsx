
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash2 } from 'lucide-react';

// Schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  relation: z.string().min(2, { message: "Relation is required" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface EmergencyContactFormProps {
  contacts: Array<{ name: string; phone: string; relation: string }>;
  setContacts: React.Dispatch<React.SetStateAction<Array<{ name: string; phone: string; relation: string }>>>;
}

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({ contacts, setContacts }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      relation: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const updatedContacts = [...contacts, data];
    setContacts(updatedContacts);
    
    // Save to localStorage
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    
    // Show success toast
    toast({
      title: "Contact added",
      description: `${data.name} has been added as an emergency contact.`,
    });
    
    // Reset form
    form.reset();
    setIsEditing(false);
  };

  const deleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    
    // Save to localStorage
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    
    // Show success toast
    toast({
      title: "Contact removed",
      description: "The emergency contact has been removed.",
    });
  };

  return (
    <div className="space-y-4">
      {contacts.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">No emergency contacts added yet</p>
          <Button onClick={() => setIsEditing(true)}>Add Contact</Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone} • {contact.relation}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteContact(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
          
          {!isEditing && (
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => setIsEditing(true)}
            >
              Add Another Contact
            </Button>
          )}
        </>
      )}
      
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 border-t pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="relation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Spouse, Parent, Friend" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex space-x-2 pt-2">
              <Button type="submit">Save Contact</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EmergencyContactForm;
