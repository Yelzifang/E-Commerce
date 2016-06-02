package k.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.SocketException;
import java.text.DateFormat;
import java.util.Date;

import org.apache.commons.net.ftp.FTPClient;

/**
 * 上传
 * 
 * @author fzb
 *
 */

public class Upload {

	public Upload() {
	}

	public static String UploadImg(String Path) {

		FTPClient ftpClient = new FTPClient();
		ftpClient.setControlEncoding("UTF-8");
		String hostname = "115.28.228.39";
		int port = 21;
		String username = "root";
		String password = "qq609150968.";

		String NewPath = null;

		Date date = new Date();
		DateFormat df = DateFormat.getDateInstance();
		DateFormat df1 = DateFormat.getTimeInstance();

		NewPath = df.format(date).toString().replaceAll("-", "")
				+ df1.format(date).toString().replace(":", "")
				+ Path.substring(Path.lastIndexOf("."), Path.length());

		try {
			ftpClient.connect(hostname, port);
			ftpClient.login(username, password);

			int reply = ftpClient.getReplyCode();

			FileInputStream input = new FileInputStream(Path);

			ftpClient.changeWorkingDirectory("img");

			ftpClient.enterLocalPassiveMode();
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			boolean isUpload = ftpClient.storeFile(NewPath, input);

			if (!isUpload)
				NewPath = null;

			input.close();
			ftpClient.logout();
			ftpClient.disconnect();
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return NewPath;
	}

}
