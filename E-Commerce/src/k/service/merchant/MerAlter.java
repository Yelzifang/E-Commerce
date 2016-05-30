package k.service.merchant;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import k.dao.DBO;

import org.json.JSONException;
import org.json.JSONObject;

import com.mysql.jdbc.Connection;

/**
 * Servlet implementation class MerAlter
 */
@WebServlet("/MerAlter")
public class MerAlter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MerAlter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();//获取账号密码
		//String cusname=request.getParameter("username");
		String mername = (String) session.getAttribute("username");
		System.out.println(mername);
		String merpassword=request.getParameter("password");
		System.out.println(merpassword);
		String mersex=request.getParameter("sex");
		String meryear=request.getParameter("year");
		String mertele=request.getParameter("tele");
		String[] params = new String[]{merpassword,mersex,meryear,mertele,mername};
		
		DBO db = new DBO();
		String sql = null ;
		int n=0;//判断是否修改成功;
		
		JSONObject json = new JSONObject();
		JSONObject js= new JSONObject();
		Boolean status = false;
		String detail = null;
		try {
			Connection conn = (Connection) db.getConn();
			if(conn!=null)
				System.out.println("conn sucess!");
			
			sql = new String("UPDATE merchant SET merpassword=?,mersex=?,meryear=?,mertele=? WHERE mername=?");
			
			n = db.executeUpdate(sql, params);
			if(n==0){
				System.out.println("修改失败！");
				detail = new String("进行修改失败！");
			}else{
				System.out.println("修改成功！");
				status = true;
				detail = new String("修改成功！");
				session.setAttribute("username", mername);
				session.setAttribute("password", merpassword);
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			db.closeAll();
			
		}catch (ClassNotFoundException | InstantiationException|IllegalAccessException | SQLException | JSONException e) {
			 			// TODO Auto-generated catch block
			 			e.printStackTrace();
		}
	}
}


