import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShoppingBag, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  contactNumber: string;
}

const OrderDialog = ({
  isOpen,
  onClose,
  productName,
  contactNumber,
}: OrderDialogProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Order Instructions
          </DialogTitle>
          <DialogDescription>
            You're interested in purchasing:
            <span className="font-medium text-foreground block mt-1">
              {productName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              To place your order:
            </p>
            <p className="font-medium">
              Please DM the interested item details to:
            </p>
            <div className="flex items-center gap-2 mt-2 bg-background p-3 rounded-md">
              <span className="text-lg font-mono">{contactNumber}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              The seller will contact you with payment and delivery details.
            </p>
            <p className="mt-2">
              Thank you for supporting local Manipuri artisans!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full glow-on-hover" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
