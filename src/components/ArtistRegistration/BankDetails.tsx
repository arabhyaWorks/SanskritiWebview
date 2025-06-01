import React from 'react';
import { TranslatableText } from '../TranslatableText';

interface BankDetailsProps {
  formData: {
    accountHolderName: string;
    accountNumber: string;
    confirmAccountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
    cancelledCheque: File | null;
  };
  onChange: (field: string, value: string | File) => void;
  onNext: () => void;
  onBack: () => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange('cancelledCheque', e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2'] border-b border-[#903603]/10 pb-4">
          <TranslatableText text="Artist's Bank Details" />
        </h2>

        <div className="text-red-500 mb-6 text-sm font-medium">
          <TranslatableText text="कृपया बैंकिंग विवरण सावधानी से भरें। किसी भी गलती के लिए आवेदक पूरी तरह से जिम्मेदार होगा।" />
          <br />
          <TranslatableText text="Note: Please fill banking details carefully. Applicant will be completely responsible in case of any mistake." />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="खाता धारक का नाम/Account Holder Name" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.accountHolderName}
                onChange={(e) => onChange('accountHolderName', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="खाता संख्या/Account Number" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => onChange('accountNumber', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="खाता संख्या की पुष्टि करें/Confirm Account Number" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.confirmAccountNumber}
                onChange={(e) => onChange('confirmAccountNumber', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="आईएफएससी कोड/IFSC Code" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => onChange('ifscCode', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="बैंक का नाम/Bank Name" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => onChange('bankName', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
                <TranslatableText text="शाखा का नाम/Branch Name" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => onChange('branchName', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-[#903603] font-bold">
              <TranslatableText text="रद्द चेक/पासबुक अपलोड करें/Upload Cancelled Cheque/Passbook" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <TranslatableText text="पीछे/Back" />
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors"
        >
          <TranslatableText text="सहेजें और आगे बढ़ें/Save and Next" />
        </button>
      </div>
    </form>
  );
};

export default BankDetails;