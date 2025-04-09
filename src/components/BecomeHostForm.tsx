
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const BecomeHostForm = () => {
  // Simple form without zod for now
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      hostType: 'homestay',
      description: '',
    }
  });
  
  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Your host application has been submitted!', {
      description: 'We will contact you shortly with next steps.'
    });
    form.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} required />
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
                    <Input placeholder="+91 9876543210" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, Imphal, Manipur" {...field} required />
                </FormControl>
                <FormDescription>
                  The address of the property you want to register
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hostType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What would you like to offer?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="homestay" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Homestay/Accommodation
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="eatery" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Eatery/Restaurant
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="guide" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Guide Services
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="experience" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Cultural Experience/Activity
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your property, experience, or services..." 
                    className="min-h-[120px]"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BecomeHostForm;
