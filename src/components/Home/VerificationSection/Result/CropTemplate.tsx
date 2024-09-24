interface CropTemplateProps {
  value: any;
}

const CropTemplate: React.FC<CropTemplateProps> = ({ value }) => {
  return (
    <div>
      <table className="border border-gray-300">
        <thead>
          <tr>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Farm ID
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Crop Name
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Season
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Year
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Sown Area
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Sowing Date
            </th>
            <th className="font-bold text-[11px] break-all border border-gray-300">
              Irrigation Type
            </th>
          </tr>
        </thead>

        <tbody>
          {value &&
            value.map((crop: any, index: number) => (
              <tr key={index}>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.farmId}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.cropName}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.season}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.year}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.sownArea}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.sowingDate}
                </td>
                <td className="font-normal text-[11px] break-all border border-gray-300">
                  {crop.irrigationType}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CropTemplate;
