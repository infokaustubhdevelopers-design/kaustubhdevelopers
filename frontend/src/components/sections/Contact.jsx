import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export default function Contact({ form, isSubmitting, onSubmit }) {
  return (
    <section id="contact" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Get in touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase mb-6 text-white">Let's Build <br />Something Great.</h2>
            <p className="text-gray-400 mb-12 text-lg">
              Ready to start your next ambitious project? Contact our estimating team for a consultation.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold uppercase text-sm text-gray-400">Address</p>
                  <p className="text-white">Suraj Trade Centre, Patna</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold uppercase text-sm text-gray-400">Phone</p>
                  <p className="text-white">(+91) 9304351968</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold uppercase text-sm text-gray-400">Email</p>
                  <p className="text-white"> kuch</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background text-foreground p-8 md:p-10 rounded-sm">
            <h3 className="text-2xl font-serif font-bold uppercase mb-6 text-foreground">Request a Quote</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground uppercase text-xs font-bold tracking-wider">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-none border-border focus-visible:ring-primary" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground uppercase text-xs font-bold tracking-wider">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" className="rounded-none border-border focus-visible:ring-primary" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground uppercase text-xs font-bold tracking-wider">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" className="rounded-none border-border focus-visible:ring-primary" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground uppercase text-xs font-bold tracking-wider">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border focus-visible:ring-primary" data-testid="select-project-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground uppercase text-xs font-bold tracking-wider">Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about the scope, location, and timeline..."
                          className="min-h-[120px] rounded-none border-border focus-visible:ring-primary resize-none"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-none h-14 text-lg font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-white hover:text-black transition-colors duration-200"
                  data-testid="button-submit-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
