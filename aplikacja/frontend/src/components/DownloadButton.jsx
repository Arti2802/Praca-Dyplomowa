import ApiURL from "../ApiURL";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";

export const DownloadButton = ({link, competition_type, desc, label}) => {
    const handleDownload = () => {
        const filename = `${desc}_${competition_type.length}_m_styl_${competition_type.style}_${competition_type.competition_id.name}.pdf`
        axios({
            url: `${ApiURL}/${link}_list/${competition_type.id}/`, 
            method: 'GET',
            responseType: 'blob', 
        })
        .then(response =>  {
            console.log(response);
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }
    return (
        <button className="btn btn-light" onClick={handleDownload}>{label} <AiOutlineFilePdf/></button>
    )
}