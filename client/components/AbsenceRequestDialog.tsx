import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Clock } from "lucide-react";

interface AbsenceRequestDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AbsenceRequestDialog({ 
  trigger, 
  open, 
  onOpenChange 
}: AbsenceRequestDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    dateDebut: "",
    dateFin: "",
    motif: "",
    justificatif: null as File | null
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.type || !formData.dateDebut || !formData.dateFin || !formData.motif) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Submit form (simulate API call)
    toast({
      title: "Demande envoyée",
      description: "Votre demande d'absence a été envoyée et sera traitée sous 24h",
    });

    // Reset form and close dialog
    setFormData({
      type: "",
      dateDebut: "",
      dateFin: "",
      motif: "",
      justificatif: null
    });
    handleOpenChange(false);
  };

  const dialogOpen = open !== undefined ? open : isOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Signaler une absence</span>
          </DialogTitle>
          <DialogDescription>
            Informez l'administration de votre absence avec justification.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="typeAbsence" className="text-right">
              Type d'absence *
            </Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData({...formData, type: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maladie">Maladie</SelectItem>
                <SelectItem value="familiale">Raisons familiales</SelectItem>
                <SelectItem value="convocation">Convocation officielle</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateDebut" className="text-right">
              Date début *
            </Label>
            <Input 
              id="dateDebut" 
              type="date" 
              className="col-span-3"
              value={formData.dateDebut}
              onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateFin" className="text-right">
              Date fin *
            </Label>
            <Input 
              id="dateFin" 
              type="date" 
              className="col-span-3"
              value={formData.dateFin}
              onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motifAbsence" className="text-right">
              Motif *
            </Label>
            <Textarea 
              id="motifAbsence" 
              className="col-span-3" 
              rows={3} 
              placeholder="Expliquez le motif de votre absence..."
              value={formData.motif}
              onChange={(e) => setFormData({...formData, motif: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="justificatifAbsence" className="text-right">
              Justificatif
            </Label>
            <Input 
              id="justificatifAbsence" 
              type="file" 
              className="col-span-3"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({...formData, justificatif: e.target.files?.[0] || null})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Envoyer la demande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
