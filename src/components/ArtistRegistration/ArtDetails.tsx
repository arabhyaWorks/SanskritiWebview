import React, { useState, useEffect } from "react";
import { TranslatableText } from "../TranslatableText";
import { artCategories, artSubCategories, grades } from "../../utils/statesCities";

interface ArtDetailsProps {
  onNext: () => void;
  onBack: () => void;
}


const experienceYears = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  value: i + 1,
}));

const ArtDetails: React.FC<ArtDetailsProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    art_cat_id: "",
    art_sub_cat_id: "",
    work_experience: "",
    presentation_level: [] as string[],
    air_doordarshan_grade: "",
    contract_payment_details_by_other_dept: "",
    other_achievements: "",
    any_video_link: "",
    first_senior_artist_or_gazetted_officers_name: "",
    first_senior_artist_or_gazetted_officers_designation: "",
    second_senior_artist_or_gazetted_officers_name: "",
    second_senior_artist_or_gazetted_officers_designation: "",
    max_five_file: [] as string[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredSubCategories, setFilteredSubCategories] = useState(artSubCategories);

  // Filter subcategories based on selected art category
  useEffect(() => {
    if (formData.art_cat_id) {
      const filtered = artSubCategories.filter(
        (subCat) => subCat.cat_id === formData.art_cat_id
      );
      setFilteredSubCategories(filtered);
      setFormData((prev) => ({ ...prev, art_sub_cat_id: "" }));
    }
  }, [formData.art_cat_id]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.art_cat_id) newErrors.art_cat_id = "Art category is required";
    if (!formData.art_sub_cat_id) newErrors.art_sub_cat_id = "Art sub-category is required";
    if (!formData.work_experience) newErrors.work_experience = "Experience is required";
    if (formData.presentation_level.length === 0)
      newErrors.presentation_level = "At least one presentation level is required";
    if (!formData.air_doordarshan_grade)
      newErrors.air_doordarshan_grade = "Grade is required";
    if (!formData.contract_payment_details_by_other_dept)
      newErrors.contract_payment_details_by_other_dept = "Contract details are required";
    if (!formData.other_achievements)
      newErrors.other_achievements = "Achievements are required";
    if (!formData.first_senior_artist_or_gazetted_officers_name)
      newErrors.first_senior_artist_or_gazetted_officers_name = "First reference name is required";
    if (!formData.first_senior_artist_or_gazetted_officers_designation)
      newErrors.first_senior_artist_or_gazetted_officers_designation =
        "First reference designation is required";
    if (!formData.second_senior_artist_or_gazetted_officers_name)
      newErrors.second_senior_artist_or_gazetted_officers_name = "Second reference name is required";
    if (!formData.second_senior_artist_or_gazetted_officers_designation)
      newErrors.second_senior_artist_or_gazetted_officers_designation =
        "Second reference designation is required";

    // Validate video link if provided
    if (
      formData.any_video_link &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.any_video_link)
    ) {
      newErrors.any_video_link = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handlePresentationLevelChange = (level: string) => {
    setFormData((prev) => {
      const currentLevels = prev.presentation_level;
      if (currentLevels.includes(level)) {
        return {
          ...prev,
          presentation_level: currentLevels.filter((l) => l !== level),
        };
      } else {
        return {
          ...prev,
          presentation_level: [...currentLevels, level],
        };
      }
    });
    setErrors((prev) => ({ ...prev, presentation_level: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      token: "cultureapisanindiatoken",
      id: localStorage.getItem("artistId") || "10060",
      art_cat_id: formData.art_cat_id,
      art_sub_cat_id: formData.art_sub_cat_id,
      work_experience: formData.work_experience,
      presentation_level: formData.presentation_level.join(","),
      air_doordarshan_grade: formData.air_doordarshan_grade,
      contract_payment_details_by_other_dept: formData.contract_payment_details_by_other_dept,
      other_achievements: formData.other_achievements,
      any_video_link: formData.any_video_link,
      first_senior_artist_or_gazetted_officers_name:
        formData.first_senior_artist_or_gazetted_officers_name,
      first_senior_artist_or_gazetted_officers_designation:
        formData.first_senior_artist_or_gazetted_officers_designation,
      second_senior_artist_or_gazetted_officers_name:
        formData.second_senior_artist_or_gazetted_officers_name,
      second_senior_artist_or_gazetted_officers_designation:
        formData.second_senior_artist_or_gazetted_officers_designation,
      max_five_file: formData.max_five_file.join(", "),
    };

    console.log(payload)

    try {
      const response = await fetch("https://upsanskriti.com/app/user-art-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 1) {
        onNext();
      } else {
        setErrors({ api: result.msg || "Submission failed" });
      }
    } catch (error) {
      setErrors({ api: "Network error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.api && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{errors.api}</div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#5A1616]/10">
        <div className="border p-6 !space-y-4 border-black rounded-xl">
          <div className="border border-black p-2 rounded-sm absolute m-2 -top-0 w-fit bg-white">
            <h2 className="text-xl font-bold text-[#903603] font-['Baloo_2']">
              <TranslatableText text="Artist's Art Details" />
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="विधा का नाम/Name of Art" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.art_cat_id}
                onChange={(e) => handleChange("art_cat_id", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                {artCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.art_cat_id && (
                <p className="text-red-500 text-sm mt-1">{errors.art_cat_id}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="विधा का क्षेत्र/Area of Art Form" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.art_sub_cat_id}
                onChange={(e) => handleChange("art_sub_cat_id", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                {filteredSubCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.art_sub_cat_id && (
                <p className="text-red-500 text-sm mt-1">{errors.art_sub_cat_id}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="कार्य अनुभव (वर्ष)/Experience" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.work_experience}
                onChange={(e) => handleChange("work_experience", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                {experienceYears.map((year) => (
                  <option key={year.id} value={year.value}>
                    {year.value} years
                  </option>
                ))}
              </select>
              {errors.work_experience && (
                <p className="text-red-500 text-sm mt-1">{errors.work_experience}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="स्प्रस्तुति/पुरस्कार का विवरण/स्तर Details/Levels of Presentation" />
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-2">
                {["National", "District Level"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.presentation_level.includes(level)}
                      onChange={() => handlePresentationLevelChange(level)}
                      className="mr-3"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
              {errors.presentation_level && (
                <p className="text-red-500 text-sm mt-1">{errors.presentation_level}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="आकाशवाणी/दूरदर्शन का ग्रेड/श्रेणी/AIR/Doordarshan Grade/Category" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.air_doordarshan_grade}
                onChange={(e) => handleChange("air_doordarshan_grade", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                {grades.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.air_doordarshan_grade && (
                <p className="text-red-500 text-sm mt-1">{errors.air_doordarshan_grade}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="संस्कृति विभाग उ०प्र० के अतिरिक्त अन्य शासकीय विभाग/संस्था से किये गए अनुबंधन एवं भुगतान का विवरण (पिछले 3 वर्षों में)" />
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.contract_payment_details_by_other_dept}
                onChange={(e) =>
                  handleChange("contract_payment_details_by_other_dept", e.target.value)
                }
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                rows={3}
                required
              />
              {errors.contract_payment_details_by_other_dept && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contract_payment_details_by_other_dept}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="अन्य उपलब्धियां / Other Achievements" />
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.other_achievements}
                onChange={(e) => handleChange("other_achievements", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                rows={3}
                required
              />
              {errors.other_achievements && (
                <p className="text-red-500 text-sm mt-1">{errors.other_achievements}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="स्दिए गए प्रस्तुति का यूट्यूब/अन्य विडियो लिंक" />
              </label>
              <input
                value={formData.any_video_link}
                onChange={(e) => handleChange("any_video_link", e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                placeholder="Enter your Youtube Link"
              />
              {errors.any_video_link && (
                <p className="text-red-500 text-sm mt-1">{errors.any_video_link}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="कलाकार किन्हीं दो वरिष्ठ कलाकार अथवा राजपत्रित अधिकारी का मन्तव्य दें जो उन्हें भली भांति जानते हों" />
                <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.first_senior_artist_or_gazetted_officers_name}
                    onChange={(e) =>
                      handleChange("first_senior_artist_or_gazetted_officers_name", e.target.value)
                    }
                    placeholder="नाम/Name"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616] mb-3"
                    required
                  />
                  {errors.first_senior_artist_or_gazetted_officers_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_senior_artist_or_gazetted_officers_name}
                    </p>
                  )}
                  <input
                    type="text"
                    value={formData.first_senior_artist_or_gazetted_officers_designation}
                    onChange={(e) =>
                      handleChange(
                        "first_senior_artist_or_gazetted_officers_designation",
                        e.target.value
                      )
                    }
                    placeholder="पद/Designation"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                    required
                  />
                  {errors.first_senior_artist_or_gazetted_officers_designation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_senior_artist_or_gazetted_officers_designation}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.second_senior_artist_or_gazetted_officers_name}
                    onChange={(e) =>
                      handleChange("second_senior_artist_or_gazetted_officers_name", e.target.value)
                    }
                    placeholder="नाम/Name"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616] mb-3"
                    required
                  />
                  {errors.second_senior_artist_or_gazetted_officers_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.second_senior_artist_or_gazetted_officers_name}
                    </p>
                  )}
                  <input
                    type="text"
                    value={formData.second_senior_artist_or_gazetted_officers_designation}
                    onChange={(e) =>
                      handleChange(
                        "second_senior_artist_or_gazetted_officers_designation",
                        e.target.value
                      )
                    }
                    placeholder="पद/Designation"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                    required
                  />
                  {errors.second_senior_artist_or_gazetted_officers_designation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.second_senior_artist_or_gazetted_officers_designation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="किये गए प्रस्तुति का फोटो/अधिकतम 5 फोटो)" />
              </label>
              <input
                type="file"
                accept="image/*"
                disabled={true}
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) return;
                  if (files.length > 5) {
                    setErrors((prev) => ({
                      ...prev,
                      max_five_file: "Maximum 5 images allowed",
                    }));
                    return;
                  }

                  const fileArray = Array.from(files);
                  const imageReaders = fileArray.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                      if (file.size > 1048576) {
                        setErrors((prev) => ({
                          ...prev,
                          max_five_file: "Each image must be under 1MB",
                        }));
                        return reject("File too large");
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64 = reader.result?.toString() || "";
                        resolve(base64);
                      };
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                    });
                  });

                  Promise.all(imageReaders)
                    .then((base64Images) => {
                      handleChange("max_five_file", base64Images);
                    })
                    .catch((error) => {
                      console.error("Image loading failed", error);
                    });
                }}
                className="w-full border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              />
              {formData.max_five_file.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {formData.max_five_file.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-32 h-32 object-cover border border-gray-300 rounded"
                    />
                  ))}
                </div>
              )}
              {errors.max_five_file && (
                <p className="text-red-500 text-sm mt-1">{errors.max_five_file}</p>
              )}
              <span className="text-red-500 text-sm">
                कृपया 1 MB से कम आकार की प्रोफ़ाइल फोटो अपलोड करें (अधिकतम 5).
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <TranslatableText text="पीछे" />
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <TranslatableText text={isSubmitting ? "Submitting..." : "सहेजें और आगे बढ़ें"} />
        </button>
      </div>
    </form>
  );
};

export default ArtDetails;